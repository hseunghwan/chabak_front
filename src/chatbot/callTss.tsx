import { exec } from 'child_process';

process.env.LANG = 'en_US.UTF-8';

const pythonScriptPath = 'C:\\Users\\sunny\\Documents\\GitHub\\chabak_front\\src\\chatbot\\chatbot.py';
const input = '"경기도 수원시 봄에 가기 좋은 차박지 추천해줘"'
const command = `python ${pythonScriptPath} ${input}`;
console.log(input)
export const runPy = exec(command, { maxBuffer: 2048 * 2048 }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Python script: ${error.message}`);
    return;
  }

  // 파이썬 스크립트의 실행 결과는 stdout에서 확인할 수 있습니다.   
  console.log(`Python script output: ${stdout}`);
  return stdout;
});



