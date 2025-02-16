import './styles/styles.sass';

import Setup from './components/setup';
import FileHandle from './components/fileHandle';

const initializeApp = async () => {

  const canvas = document.createElement('canvas')!;
  const container = document.querySelector('.container__visualizador')!;
  container.appendChild(canvas);

  const setup = new Setup();
  await setup.init(canvas as HTMLCanvasElement);
  // setup.inspector()
  // setup.testSetup()
  const fileHandle = new FileHandle(setup);

  document.getElementById('file')!.addEventListener('change', (e) => {
    fileHandle.selectModelFromInput(e);
  });

};

initializeApp(); 