let failedLoadAttempts = 2;
let failedSaveAttempts = 2;
let failedPrintExcelAttempts = 2;

class NoteService {
  static load() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedLoadAttempts > 1) {
          const notes = window.localStorage.getItem('notes');
          resolve(notes ? JSON.parse(notes) : []);
        } else {
          reject();
          failedLoadAttempts++;
        }
      }, 2000);
    });
  }
  static save(notes) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          window.localStorage.setItem('notes', JSON.stringify(notes));
          resolve();
        } else {
          reject();
          failedSaveAttempts++;
        }
      }, 2000);
    });
  }

  static printExcel() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedPrintExcelAttempts > 1) {
          const notes = window.localStorage.getItem('notes');
          resolve(notes ? JSON.parse(notes) : []);
        } else {
          reject();
          failedPrintExcelAttempts++;
        }
      }, 2000);
    });
  }
}

export default NoteService;
