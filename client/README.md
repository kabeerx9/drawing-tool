# Drawing Tool Project

## Overview

This project is a simple drawing tool consisting of a Next.js client application and a Node.js server. The project is containerized using Docker for easy development and deployment.

## Project Structure

```
drawing-tool/
├── client/
│   ├── Dockerfile
│   └── ... (Next.js app files)
├── server/
│   ├── Dockerfile
│   └── ... (Node.js app files)
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

## Prerequisites

- Docker
- Docker Compose

## Development Setup

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/drawing-tool.git
   cd drawing-tool
   ```

2. Start the development environment:

   ```
   docker-compose up --build
   ```

3. Access the application:
   - Client: http://localhost:3000
   - Server: http://localhost:5000

The development setup includes hot-reloading, so any changes you make to the code will automatically update in the running application.

## Production Setup

1. To run the application in production mode:

   ```
   docker-compose -f docker-compose.prod.yml up --build
   ```

2. Access the application:
   - Client: http://localhost:3000
   - Server: http://localhost:5000

## Features

- Real-time drawing capabilities
- [Add any other features of your drawing tool]

## Technologies Used

- Frontend: Next.js
- Backend: Node.js
- Containerization: Docker

## Contact

[Kabeer Joshi] - [kabeer786joshi@gmail.com]
