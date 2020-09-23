const {generateMnemonic, EthHdWallet} = require('eth-hd-wallet')
const fs = require('fs')
const readlineSync = require('readline-sync');
const mkdirp = require("mkdirp")
const os = require("os")

module.exports = {
    NamedWallet : NamedWallet
}

function NamedWallet(walletName){
    //get file path in wallet-config
    let config_path = os.homedir()+"/.named_wallet/wallet-vault.json"


    let _w_data = {}
    try{
        _w_data = JSON.parse(fs.readFileSync(config_path,"utf8")) 
    } catch(err){
        console.log("can't find wallet-vault.json, create a new one")
        let path = os.homedir()+"/.named_wallet"
        if (!fs.existsSync(path)) {
            mkdirp.sync(os.homedir()+"/.named_wallet")
        }
        
        fs.writeFileSync(config_path, '{}')
    }
    if(walletName in _w_data){
        this.e_wallet = _enc_wallets[walletName]
    }else{
        console.log("can't find the wallet with name:", walletName, "create one for you")
        //require for a password for aes key generation
        var walletName = readlineSync.question('Please give this wallet a name: ');
        var pass = readlineSync.question('Set a password to protect this wallet: ', {
            hideEchoBack: true // The typed text on screen is hidden by `*` (default).
            });
        
    }

}

/* vault contains many wallets, the whole structure is like this
    {
        metaData: {
            endPoint: "https://ropsten.infura.io/v3/xxx", //ethereum entry point
            lastWallet: "w1", //the name of wallet if not specified
            nextIndex: 1, //the keyChainIndex for the next wallet generation
            walletNames: ["w1"],
        },
        wallets:{
            w1: {
                metaData:{
                    hint: "whats my favorite dish?", //hint for password needed to open wallet
                    encryptedMne: "1234abcd", //aes encrypted mnemonics
                    names: ["account1", "account2"], // account names
                    lastName: "eth1", // the address name that is last opened
                },
                accounts:{
                    eth1:{
                        keyChainIndex: 0, //the xth key
                        assets: ["address1", "address2"], //addresses for tokens
                    }
                }                
            }
        }
    }
*/
function vault(){
}

vault.prototype = {
    
    from: function(str){
        obj = JSON.parse(str)
        this.metaData = obj.metaData
        this.wallets = obj.wallets
        return this
    },
    setEntryPoint: function(p){
        this.metaData.endPoint = p
        return this
    },
    getWallet: function(name){
        if(!this.wallets[name]){
            throw "wallet: "+name+" not found"
        }
        _w = new wallet()
        return _w.from(this.wallets[name])
        
    },
    addWallet: function(name, hint, pass){
        if (this.wallets[name]){
            throw "wallet: "+name+" exists"
        }
    }
}

function wallet(){
}

wallet.prototype = {
   from: function(obj){
       this.metaData = obj.metaData
       this.accounts = obj.accounts
       return this
   } 


}
