import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import path from 'path';

const server = fastify();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Calculator {
   static add(num1, num2) {
      return num1 + num2;
   }

   static subtract(num1, num2) {
      return num1 - num2;
   }

   static multiply(num1, num2) {
      return num1 * num2;
   }

   static divide(num1, num2) {
      if (num2 === 0) {
         throw new Error("Division by zero is not allowed.");
      }
      return num1 / num2;
   }
}

server.register(fastifyStatic, {
   root: path.join(__dirname, '../client'),
   prefix: '/'
});


server.post('/calculate', async (request, reply) => {
   const { operation, num1, num2 } = request.body;

   const validOperations = ['add', 'subtract', 'multiply', 'divide'];
   if (!validOperations.includes(operation)) {
      reply.status(400).send({ error: 'Invalid operation' });
      return;
   }

   if (isNaN(num1) || isNaN(num2)) {
      reply.status(400).send({ error: 'Invalid numbers' });
      return;
   }

   try {
      const n1 = parseFloat(num1);
      const n2 = parseFloat(num2);
      let result;

      switch (operation) {
         case 'add':
            result = Calculator.add(n1, n2);
            break;
         case 'subtract':
            result = Calculator.subtract(n1, n2);
            break;
         case 'multiply':
            result = Calculator.multiply(n1, n2);
            break;
         case 'divide':
            result = Calculator.divide(n1, n2);
            break;
         default:
            throw new Error('Invalid operation');
      }

      reply.send({ result });
   } catch (error) {
      reply.status(400).send({ error: (error.message) });
   }
});

server.listen({ port: 5556 })
   .then(() => {
      console.log('Server started');
   })
   .catch((error) => {
      console.log('Error', error);
   });


