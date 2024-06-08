const fs = require('fs');
const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-cors'), {
	origin: true, 
	methods: ['GET', 'POST'],
});

fastify.get('/', async (request, reply) => {
	fs.readFile('./users.json', 'utf8', (err, data) => {
		if (err) {
			console.log('File read failed:', err);
			return reply.code(500).send('Internal Server Error');
		}

		let users = JSON.parse(data);

		// Фильтрация по имени
		if (request.query.term) {
			users = users.filter((elem) =>
				elem.name.toLowerCase().includes(request.query.term.toLowerCase())
			);
		}

		// Пагинация
		const page = parseInt(request.query.page) || 1;
		const limit = parseInt(request.query.limit) || 9;
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const paginatedUsers = users.slice(startIndex, endIndex);

		reply.send({ users: paginatedUsers, total: users.length });
	});
});

const start = async () => {
	try {
		await fastify.listen(3000);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
