import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    # Display the entries in the database on index.html
    check = db.execute("SELECT name FROM sqlite_schema WHERE type='table' AND name='purchases'")
    if check == []:
        return render_template("buy.html")
    else:
        purchases = db.execute("SELECT * FROM purchases WHERE session_id = ?", session["user_id"])
        for i in range(len(purchases)):
            symbol_prep = purchases[i]["symbol"]
            symbol_obj = lookup(symbol_prep)
            current_price = symbol_obj["price"] * float(purchases[i]["shares"])
            users = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])
            cash = users[0]["cash"]
            cash = float(cash[1:].replace(',',''))
            totals = current_price + cash
            return render_template("index.html", purchases=purchases, symbol_obj=symbol_obj, current_price=current_price, cash=cash, totals=totals)
    return render_template("buy.html")

@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""

    if request.method == "GET":
        return render_template("buy.html")

    elif request.method == "POST":
        if ( lookup(request.form.get("symbol")) == None ):
            return apology("apology.html")
        elif ( float(request.form.get("shares")) < 1 ):
            return apology("apology.html")
        else:
            symbol = lookup(request.form.get("symbol"))
            cashobj = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])
            cashobj = cashobj[0]["cash"]
            cashobj = cashobj[1:].replace(',','')
            purchase = symbol["price"] * float(request.form.get("shares"))
            if purchase > float(cashobj):
                return apology("apology.html")
            else:
                less_cash = float(cashobj) - purchase
                db.execute("CREATE TABLE IF NOT EXISTS purchases (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, session_id NUMERIC, symbol TEXT NOT NULL, quote NUMERIC NOT NULL, shares NUMERIC NOT NULL, purchase_total NUMERIC NOT NULL, datetime CURRENT_TIMESTAMP,  FOREIGN KEY(session_id) REFERENCES users(id))")
                db.execute("CREATE UNIQUE INDEX IF NOT EXISTS id ON purchases(id)")
                db.execute("INSERT INTO purchases (session_id, symbol, quote, shares, purchase_total) VALUES (?,?,?,?,?)", session["user_id"], symbol["symbol"], usd(symbol["price"]), request.form.get("shares"), usd(purchase))
                db.execute("UPDATE users SET cash = ? WHERE id = ?", usd(less_cash), session["user_id"])
                return redirect("/")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    return apology("TODO")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        # return redirect("/")
        return render_template("index.html")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""

    if request.method == "GET":
        return render_template("quote.html")

    elif request.method == "POST":
        if ( lookup(request.form.get("symbol")) == None ):
            return apology("apology.html")

        else:
            symbol = lookup(request.form.get("symbol"))
            return render_template("displayquote.html", symbol=symbol)


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "GET":
        return render_template("register.html")

    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            #return apology("must provide username", 400)
            return apology("apology.html")

        # Ensure password was submitted
        elif not request.form.get("password"):
            #return apology("must provide password", 400)
            return apology("apology.html")

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username is not taken and password is correct
        if len(rows) == 1 or request.form.get("password") != request.form.get("confirmation"):
            #return apology("invalid username and/or password", 400)
            return apology("apology.html")

        # Generate Password Hash
        hash = generate_password_hash(request.form.get("password"))

        #Insert User Into the Database
        db.execute("INSERT INTO users (username, hash) VALUES (?,?)", request.form.get("username"), hash)

        newrow = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Remember which user has logged in
        session["user_id"] = newrow[0]["id"]

        # Redirect user to home page
        return redirect("/")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    return apology("TODO")