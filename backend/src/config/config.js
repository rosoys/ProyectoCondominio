export const {
	// Servidor
	PORT = 1000,

	// Oracle DB
	DB_USER = 'analisis',
	DB_PASSWORD = '1234',
	DB_HOST = 'localhost',
	DB_PORT = 1521,
	DB_SERVICE = 'orclpdb',

	// Autenticación
	SALT_ROUND = 10,
	SECRET_JWT_KEY = 'tu_clave_secreta_para_jwt',
} = process.env;
