# UserActivityClient

# About Project

## The architecture and workflow is explained below

# About Tech Stack
- The Frontend is done in Next.js and the backend is in Node.js and Express.js.
- For the database I have used PostgreSql and Prisma as the ORM.
- For the Two-Factor Authentication I have used speakeasy library.
- I Have written all the code in Typescript.
- The realtime experience is given by the ws library for websockets.
- The sessions are managed by next-auth providing a layer between the Node.js backend and Next.js Frontend.

# Workflow
- The user gets a signin prompt upon visiting where he can create/login into existing account in which email has to be unique.
- Upon signin the db stores the userinfo , deviceInfo and adds a session connecting the user and the device.
- Then from frontend we check if the two factor is enabled for the user.If enabled then ask for two factor code from their authenticator app.
- After giving the right code user can access the dashboard where they have the option to check for the Two-factor key , Log out , or check for the current logged in devices.
- In the current logged in devices section if the same id gets logged in from somewhere else it gets updated in realtime as the websocket sends a message upon signin and the devices section checks for the particular message of device added and update the state.
- The user has the autority to remove any existing session from the Devices section.