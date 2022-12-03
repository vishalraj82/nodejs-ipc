const { fork } = require('child_process');
const path = require('path');

async function main () {
    const script = path.resolve(__dirname, 'child.js');
    const scriptArgs = [`--jobId=${Date.now()}`, ];
    const getRandomTime = () => Math.floor(Math.random() * 10000);

    const childProcess = fork(script, scriptArgs);

    childProcess
        .on('message', function onMessage (message) {
            const exitCode = message.status === 'success' ? 0 : 1;

            console.log(`Child process responded with`);
            console.log(`\tJob Id:   ${message.jobId}`);
            console.log(`\tStatus:   ${message.status}`);
            console.log(`\tDuration: ${message.duration}`);
            console.log(`\tOutput:   ${message.output}`);

            childProcess.send({ command: 'exit', exitCode });
        });
    
    childProcess.send({
        command: 'begin',
        resolveTimeout: getRandomTime(),
        rejectTimeout: getRandomTime(),
    });
}

main();
