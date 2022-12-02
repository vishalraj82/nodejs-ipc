## Nodejs Javascript IPC

In Javascript application world, a long running process is almost obscure, but not really.
While there can be many ways to handle such situation, off-loading the long running
process to a child process has some benefits viz

1. The main thread of the server application is freed up for the server to handle other requests.
2. The child process runs independently of the parent process, meaning that if the parent process exits for any reason, the child process will continue to run.
3. Inter process communication is possible, allowing parent and child process to easily communicate with each other.

For more information about child processes in NodeJS see https://nodejs.org/api/child_process.html#child_processforkmodulepath-args-options

#### Visual representation

```bash
+-------------------+            +-----------------------+                 +-------------------------------+
|                   |            |                       |                 |    Script to handle           |
|  Parent Process   |  <- IPC -> |    Child process      | <- Execution -> |    really long running        |
|                   |            |                       |                 |    task                       |
+-------------------+            +-----------------------+                 +-------------------------------+
```

The parent and the child process can communicate with each other via events and send message to each other.

The example created here demonstrates how parent and child process work. The file `longRunningJob.js` contains
an example of long running job.