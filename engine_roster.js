class Roster {
	constructor() {
		this.accounts = storedAccounts || {};
	}

	registerAccount(account, req) {
		if (!this.accountExists(req)) {
			account = this.createAccount(req);
		} else {
			account.error = "Account exists with that name.";
		}

		return account;	
	}

	accountExists(req) {
		var name = req.query.name;
		return !accounts[name] === undefined;
	}

	createAccount(req) {
		account.name = name;
		this.assignAccountId(account);
		account.game_ids = [];
		accounts[name] = account;
		return account;
	}

	assignAccountId(account) {
		account.id = Object.keys(this.accounts).length + 1;
	}

	findAccount(req) {
	  return this.loadAccount(req) || {"account" : {"error" :  {'error' : 'Account not found'}};
	}

	loadAccount(req) {
		return this.accounts[req.query.name];
	}
}
