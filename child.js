const longRunningJob = require('./longRunningJob.js');
const process = require('process');

const args = process.argv;

function getJobId (args) {
    const arg = args.find(arg => arg.startsWith('--jobId'));
    return arg ? arg.split('=').pop() : ('' + Math.random()).replace(/^0+\.0?/, '');
}

process
    .on('uncaughtexception', function onUncaughtException (error) {
        console.log(`Exiting upon uncaught error - ${JSON.stringify(error)}`);
        process.exit(1);
    })
    .on('message', async function onMessage (message) {
        const { command, ...rest } = message;
        const jobId = getJobId(args);

        const getDuration = start => Date.now() - start;

        if (command === 'begin') {
            let status, output;
            const start = Date.now();

            try {
                output = await longRunningJob({ jobId, ...rest });
                status = 'success';
            } catch (error) {
                output = JSON.stringify(error);
                status = 'error';
            }

            process.send({ status, jobId, output, duration: getDuration(start) });
        } else if (command === 'exit') {
            process.exit(rest.exitCode);
        }
    });
