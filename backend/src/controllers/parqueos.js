import { ParqueoModel } from '../models/parqueo.js';
import { validarParqueo, validarParqueoParcial } from '../schemas/parqueos.js';

export class ParqueoController {
	static async obtenerTodos(req, res) {
		const parqueos = await ParqueoModel.obtenerTodos();
		res.json(parqueos);
	}

	static async obtenerPorId(req, res) {
		const { numero } = req.params;
		const parqueo = await ParqueoModel.obtenerPorNumero({ numero });
		if (parqueo) return res.json(parqueo);
		res.status(404).json({ mensaje: 'Parqueo no encontrado.' });
	}

	static async crear(req, res) {
		const resultado = validarParqueo(req.body);
		if (!resultado.success) {
			return res.status(400).json({ error: JSON.parse(resultado.error.message) });
		}

		const nuevoParqueo = await ParqueoModel.crear({
			datos: { ...resultado.data },
		});
		res.status(201).json(nuevoParqueo);
	}

	static async actualizar(req, res) {
		const resultado = validarParqueoParcial(req.body);
		if (!resultado.success) {
			return res.status(400).json({ error: JSON.parse(resultado.error.message) });
		}

		const { id } = req.params;
		const parqueoActualizado = await ParqueoModel.actualizar({ id, datos: resultado.data });

		if (!parqueoActualizado) return res.status(404).json({ mensaje: 'Parqueo no encontrado.' });
		return res.json(parqueoActualizado);
	}

	static async eliminar(req, res) {
		const { id } = req.params;
		const resultado = await ParqueoModel.eliminar({ id });

		if (!resultado) return res.status(404).json({ mensaje: 'Parqueo no encontrado.' });
		return res.json({ mensaje: 'Parqueo eliminado.' });
	}
}
