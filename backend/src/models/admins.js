const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema(    // creation du Schema.. c ad un model pour la creation d'un admin
    {   
        
        matricule: {
            type: String,
            required: true,
            unique: true
        },
        nom: {
            type: String,
            required: true,
        },
        prenom: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true, // pour rendre le champ obligatoir
            unique: true, // pour rendre l'email unique
            lowercase: true, // pour mettre l'email en miniscule
            trim: true, // pour enlever les espaces vides
            validate(v) {
                if (!validator.isEmail(v)) throw new Error('E-mail non valide');

            }

        },

        password: {
            type: String,
            required: true,
            validate(v) {
                if (!validator.isLength(v, { min: 4, max: 20 })) throw new Error('le mot de passe doit etre entre 4 et 20 caracteres');
            }
        }
    });
// hash du mot de passe avanr enregistrement
userSchema.pre('save', async function () {
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 8);
});

// methode statique pour la connecxion
userSchema.statics.findUser = async function (email, password) {
    const user = await this.findOne({ email }); //recuperation de l'email
    if (!user) throw new Error('Erreur, pas possible de se connecter!'); // si l'email n'exite pas on renvoi ce message

    const isPasswordValid = await bcrypt.compare(password, user.password); // is ... c'est pour renvoyer un booleen
    if (!isPasswordValid) throw new Error('Erreur, pas possible de se connecter'); //on verifie si le mot de passe compare existe  si non on renvoi le sms d'erreur si ou on return user
    return user;
}




const User = mongoose.model('User', userSchema); // creation du middleware


module.exports = User;



//pour hacher le password on va utiliser le module bcrypt . npm i bcryptjs