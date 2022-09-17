import { Obj } from '@abstract/Obj';

class Renderer extends Obj {
  render(): void {
    const information = document.getElementById('info');
    if (!information) return;
    const versions = (
      window as unknown as {
        versions: { chrome(): string; node(): string; electron(): string; ping(): Promise<string> };
      }
    ).versions;
    information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;
    void (async () => {
      const response = await versions.ping();
      console.info(response);
    })();
  }
}

new Renderer().render();
