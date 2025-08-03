const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const JWT_SECRET = process.env.JWT_SECRET || 'secretKey123';

const UserController = {
    register: async (req, res) => {
        try {
            const { name, lastName, alias, email, password, roleId } = req.body;

            if (!name || !lastName || !alias || !email || !password) {
                return res.status(400).json({ message: 'Todos los campos son requeridos' });
            }

            const existingUser = await UserModel.findByEmailOrAlias(email);
            if (existingUser) {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await UserModel.createUser({
                name,
                lastName,
                alias,
                email,
                password: hashedPassword,
                roleId: roleId || 2
            });

            res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    login: async (req, res) => {
        try {
            const { emailOrAlias, password } = req.body;

            const user = await UserModel.findByEmailOrAlias(emailOrAlias);
            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const valid = await bcrypt.compare(password, user.pass_cat);
            if (!valid) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                {
                    id_user_cat: user.id_user_cat,
                    alias_cat: user.alias_cat,
                    role_cat_id: user.role_cat_id
                },
                JWT_SECRET,
                { expiresIn: '2h' }
            );

            res.json({
                message: 'Login exitoso',
                token,
                nombre: `${user.name_cat} ${user.last_name_cat}`,
                rol: user.role_cat_id === 1 ? 'admin_cat' : 'normal_cat',
                email: user.email_cat,
                role_cat_id: user.role_cat_id
            });

        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },


    // FUNCIÓN ADMIN: Obtener todos los usuarios
    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.getAllUsers();
            res.json({ users });
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error al obtener usuarios' });
        }
    },

    // DELETEAR USUARIOS
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await UserModel.deleteUser(id);

            if (!user) {
                return res.status(403).json({ message: 'No se puede eliminar este usuario (puede que sea admin o no exista).' });
            }

            res.json({ message: 'Usuario eliminado correctamente', user });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

};

module.exports = UserController;
