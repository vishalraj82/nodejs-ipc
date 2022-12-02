const longRunningJob = require('./longRunningJob.js');

const args = process.argv;

function getJobId (args) {
    const arg = args.find(arg => arg.startsWith('--jobId'));
    return arg ? arg.split('=').pop() : Date.now();
}

const getDuration = start => Date.now() - start;

process
    .on('uncaughtexception', function onUncaughtException (exception) {
        console.log(`Exiting upon uncaught exception - ${JSON.stringify(exception)}`);
        process.exit(1);
    })
    .on('message', async function onMessage (message) {
        const { command, ...rest } = message;

        const jobId = getJobId(args);
        if (command === 'begin') {
            const start = Date.now();
            try {
                const output = await longRunningJob({ jobId, ...rest });
                process.send({
                    status: 'success',
                    jobId,
                    output,
                    duration: getDuration(start),
                });
            } catch (error) {
                process.send({
                    status: 'error',
                    jobId,
                    output: JSON.stringify(error),
                    duration: getDuration(start),
                });
            }
        } else if (command === 'exit') {
            process.exit(rest.exitCode);
        }
    });
