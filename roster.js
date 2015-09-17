var accounts = {};

var registerAccount = function(account, req) {
	var name = req.query.name;
	if (accounts[name] === undefined) {
		account.name = name;
		accounts[name] = account;
	} else {
		account.error = "Account exists with that name.";
	}

	return account;
};

var findAccount = function(req) {
	if (accounts[req.query.name]) {
		return accounts[req.query.name];
	}

	return {'error' : 'Account not found'};
}

module.exports = {
	"registerAccount": registerAccount,
	"findAccount" : findAccount,
	"accounts" : accounts
};