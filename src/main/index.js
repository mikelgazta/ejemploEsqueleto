import { app, shell, BrowserWindow, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  const mainMenu = Menu.buildFromTemplate([
    {
      label: 'Ventanas',
      submenu: [
        {
          label: 'Abrir Segunda Ventana',
          click: () => {
            const secondWindow = new BrowserWindow({
              width: 900,
              height: 670,
              show: false,
              autoHideMenuBar: false,
              ...(process.platform === 'linux' ? { icon } : {}),
              webPreferences: {
                preload: join(__dirname, '../preload/index.js'),
                sandbox: false,
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
              }
            });
  
            // Define el evento close en la ventana secundaria para cerrar la aplicación
            secondWindow.on('close', () => {
              // Cierra la ventana principal y sale de la aplicación
              mainWindow.close();
              app.quit();
            });
  
            // Carga el archivo second.html en la ventana secundaria
            secondWindow.loadFile(join(__dirname, '../renderer/second.html'));
          }
        }
      ]
    }
  ]);
  

  // Establece el menú de la aplicación
  Menu.setApplicationMenu(mainMenu);

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    var url = process.env['ELECTRON_RENDERER_URL']
    url = url + '/index.html'
    mainWindow.loadURL(url)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

//Index para enviar un mensaje a otra ventana
// const { app, BrowserWindow, ipcMain, Menu } = require('electron');
// const path = require('path');

// let mainWindow; // Variable para almacenar la ventana principal

// function crearVentanaPrincipal() {
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true
//     }
//   });

//   // Cargar el archivo index.html en la ventana principal
//   mainWindow.loadFile(path.join(__dirname, 'index.html'));

//   // Cuando se cierre la ventana principal, salir de la aplicación
//   mainWindow.on('closed', () => {
//     app.quit();
//   });

//   // Añadir una entrada al menú
//   const menuPrincipal = Menu.buildFromTemplate([
//     {
//       label: 'Menú',
//       submenu: [
//         {
//           label: 'Enviar Mensaje',
//           click: () => {
//             // Enviar un mensaje a la ventana principal
//             mainWindow.webContents.send('mensaje-enviado', 'Este es un mensaje enviado desde la ventana principal');
//           }
//         }
//       ]
//     }
//   ]);
//   Menu.setApplicationMenu(menuPrincipal);
// }

// app.on('ready', crearVentanaPrincipal);

// // Cuando se cierran todas las ventanas, salir de la aplicación (en macOS es común que la aplicación permanezca activa incluso después de cerrar todas las ventanas)
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// // Función para abrir otra ventana
// function abrirOtraVentana() {
//   const otraVentana = new BrowserWindow({
//     width: 400,
//     height: 300,
//     webPreferences: {
//       nodeIntegration: true
//     }
//   });

//   // Cargar el archivo otraVentana.html en la otra ventana
//   otraVentana.loadFile(path.join(__dirname, 'otraVentana.html'));
// }

// // Agregar un listener para recibir el mensaje
// ipcMain.on('mensaje-enviado', (event, data) => {
//   console.log('Mensaje recibido desde la ventana principal:', data);
//   // Abrir otra ventana después de recibir el mensaje
//   abrirOtraVentana();
// });
