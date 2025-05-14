import random
import time
import sys

def welcome():
    print("\n🎉 Welcome to the Number Guessing Game!")
    print("I'm thinking of a number between 1 and 100.")
    print("Your task is to guess it based on your selected difficulty.")

def choose_difficulty():
    print("\nPlease select the difficulty level:")
    print("1. Easy (10 chances)")
    print("2. Medium (5 chances)")
    print("3. Hard (3 chances)")

    while True:
        choice = input("Enter your choice (1/2/3): ")
        if choice == "1":
            print("\nYou selected Easy difficulty.")
            return 10
        elif choice == "2":
            print("\nYou selected Medium difficulty.")
            return 5
        elif choice == "3":
            print("\nYou selected Hard difficulty.")
            return 3
        else:
            print("❌ Invalid choice. Please choose 1, 2, or 3.")

def play_game(chances, high_score):
    number = random.randint(1, 100)
    attempts = 0
    start_time = time.time()

    while chances > 0:
        try:
            guess = int(input(f"\nEnter your guess (remaining chances: {chances}): "))
            attempts += 1
            chances -= 1

            if guess == number:
                duration = round(time.time() - start_time, 2)
                print(f"\n🎉 Congratulations! You guessed the correct number in {attempts} attempts and {duration} seconds.")
                if high_score is None or attempts < high_score:
                    print("🏆 New High Score!")
                    high_score = attempts
                return high_score

            elif guess < number:
                print("🔺 The number is greater than your guess.")
            else:
                print("🔻 The number is less than your guess.")

        except ValueError:
            print("⚠️ Please enter a valid integer.")

    print(f"\n💀 Game Over! You've used all your chances. The correct number was {number}.")
    return high_score

def play_again():
    again = input("\n🔁 Do you want to play again? (y/n): ").strip().lower()
    return again == "y"

def main():
    high_score = None
    while True:
        welcome()
        chances = choose_difficulty()
        print("\n🕹️ Let's start the game!")
        high_score = play_game(chances, high_score)
        if not play_again():
            print("\n👋 Thanks for playing! See you next time.")
            sys.exit()

if __name__ == "__main__":
    main()
