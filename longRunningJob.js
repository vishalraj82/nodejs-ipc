
async function longRunningJob(options) {
    const { jobId, resolveTimeout, rejectTimeout } = options;

    return new Promise((resolve, reject) => {
        setTimeout(function willResolve() {
            resolve(`Resolved after ${resolveTimeout} ms`);
        }, resolveTimeout);

        setTimeout(function willReject() {
            reject(`Rejected after ${rejectTimeout} ms`);
        }, rejectTimeout);
    });
};

module.exports = longRunningJob;
