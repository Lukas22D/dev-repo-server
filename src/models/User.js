import mongoose from "mongoose";


// Criação do Schema(estrutura) do usuário
// Schema é a estrutura de um documento dentro de uma coleção no MongoDB
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            index: {
                // Garante que não haverá dois usuários com o mesmo email
                unique: true,
            }
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        // Criação de um campo de data de criação e de atualização
        timestamps: true

    });

// Exportando o Schema do usuário
export default mongoose.model("User", userSchema);