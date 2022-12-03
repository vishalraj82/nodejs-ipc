
async function longRunningJob(options/*: Object */)/*: string */ {
    const { jobId, resolveTimeout, rejectTimeout } = options;

    return new Promise((resolve, reject) => {
        /**
         * Here we are creating a race condition between to timeouts
         * to see if the `longRunningJob` will succeed or fail. Both
         * the scenarios will happen randomnly based on whichever
         * timeout happens first, beating the other one.
         */

        // Represents success of long running job
        setTimeout(function willResolve() {
            resolve(`Resolved after ${resolveTimeout} ms`);
        }, resolveTimeout);

        // Represents failure of long running job
        setTimeout(function willReject() {
            reject(`Rejected after ${rejectTimeout} ms`);
        }, rejectTimeout);
    });
};

module.exports = longRunningJob;
