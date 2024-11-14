const accountModel = require('../models/account.model');
const {createAccountValidate} = require('../validations/account.valid')


module.exports = {
    createAccount: async (req,res) => {
        const body = req.body;

        const { value, error } = createAccountValidate(body);


        if(error) {
            return res.status(400).json({
                statusCode :  400,
                message: error.message
            });
        }
        const account = await accountModel.create(value);
        return res.status(201).json(account);
    },
    getAccounts: async (req, res) => {
        const { username, phone } = req.query;
        //username LIKE %a%
    
        const bodyQuery = {};
    
        if (username) {
          bodyQuery.username = {
            $regex: `.*${username}.*`,
            $options: 'i',
          };
        }
    
        if (phone) {
          bodyQuery.phone = phone;
        }
    
        const accounts = await accountModel.find(bodyQuery);
        return res.status(200).json(accounts);
      },
    
      //update account
      updateAccount: async (req, res) => {
        try {
            const id = req.params.id;
            const { username, password, role } = req.body;
    
            const result = await accountModel.findByIdAndUpdate(
                id,
                { username, password, role },
                { new: true } 
            );
    
            console.log(id);
    
            if (result) {
                return res.status(200).json({ message: 'updated success ', account: result });
            } else {
                return res.status(404).json({ message: ' not found' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    
      //delete account
      deleteAccount: async (req, res) => {
        try {
          const id = req.params.id;
          const deletedAcc = await accountModel.findByIdAndDelete(id);
    
          if (!deletedAcc) {
            return res.status(404).json({ message: 'Account not found' });
          }
    
          return res.status(200).json({ message: 'Account deleted ' });
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      },
      getAccountById: async (req, res) => {
        const id = req.params.id;
        const account = await accountModel.findById(id);
    
        return res.status(200).json(account);
      },

}