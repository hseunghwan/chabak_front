import { exec } from 'child_process';

const pythonScriptPath = 'path/to/python_script.py';
const command = `python ${pythonScriptPath}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Python script: ${error.message}`);
    return;
  }

  // 파이썬 스크립트의 실행 결과는 stdout에서 확인할 수 있습니다.
  console.log(`Python script output: ${stdout}`);
});
