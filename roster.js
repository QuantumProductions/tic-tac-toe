var accounts = {};

registerAccount = function(account, req) {
	var name = req.query.name;
	if (accounts[name] === undefined) {
		account.name = name;
		accounts[name] = account;
	} else {
		account.error = "Account exists with that name.";
	}

	return account;
};

findAccount = function(req) {
	if (accounts[req.query.name])) {
		return accounts[req.query.name];
	}

	return null;
}

module.exports = {
	"registerAccount": registerAccount,
	"accounts" : accounts
};