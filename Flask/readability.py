from cs50 import *
import math
import string
import curses

# Configure application
#app = Flask(__name__)


def main():
    reading = get_string("Text: ")

    lettersnum = count_letters(reading)
    wordsnum = count_words(reading)
    sentencenum = count_sentences(reading)

    index = 0

    L = lettersnum / wordsnum * 100
    S = sentencenum / wordsnum * 100

    index = round(0.0588 * L - 0.296 * S - 15.8)

    print(L)
    print(S)

    if (index < 1):
        print("Before Grade 1\n")
    elif (index >= 16):
        print("Grade 16+\n")
    else:
        print("Grade", index)


def count_letters(text):
    length = len(text)
    num = 0
    for i in range(length):
        if (text[i].isalpha() == True):
            num += 1
    print("letters\n", num)
    return num


def count_words(text):
    length = len(text)
    num2 = 1
    for i in range(length):
        if (text[i].isspace() == True):
            num2 += 1
    print("words\n", num2)
    return num2


def count_sentences(text):
    length = len(text)
    num3 = 0
    for i in range(length):
        if (text[i] == '.' or text[i] == '?' or text[i] == '!'):
            num3 += 1
    print("sentences\n", num3)
    return num3


main()