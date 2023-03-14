#include<iostream>
#include<ctime>

void PrintIntroduction(int Difficulty) 
{
	std::cout << "\n\nYou are a secret agent breaking into a level " << Difficulty << " secure server room..." << std::endl;
	std::cout << "Enter the correct code to continue..." << std::endl;
}

bool PlayGame(int Difficulty) 
{
	PrintIntroduction(Difficulty);

	const int CodeA = rand() % Difficulty + Difficulty;
	const int CodeB = rand() % Difficulty + Difficulty;
	const int CodeC = rand() % Difficulty + Difficulty;

	const int CodeSum = CodeA + CodeB + CodeC;
	const int CodeProduct = CodeA * CodeB * CodeC;
	
	// Print CodeSum and CodeProduct to terminal 
	std::cout << "+ There are three numbers in the code " << CodeA << " " << CodeB << " " << CodeC << std::endl;
	std::cout << "+ The codes add-up to: " << CodeSum << std::endl;
	std::cout << "+ The codes multiply to give: " << CodeProduct << std::endl;

	// Store player guess
	int GuessA;
	int GuessB;
	int GuessC;
	std::cin >> GuessA >> GuessB >> GuessC;

	int GuessSum = GuessA + GuessB + GuessC;
	int GuessProduct = GuessA * GuessB * GuessC;

	// Check if guess is correct 
	if (GuessSum == CodeSum && GuessProduct == CodeProduct) 
	{
		std::cout << "\n*** Well done! Keep going! ***" << std::endl;
		return true;
	}
	else
	{
		std::cout << "\n*** You entered the wrong code! Careful! Try again! ***" << std::endl;
		return false;
	}
}

int main() 
{
	srand(time(NULL)); // Create new random sequence based on time of day 

	int LevelDifficulty = 1;
	const int MaxDifficulty = 5;

	while (LevelDifficulty <= MaxDifficulty)
	{
		bool bLevelComplete = PlayGame(LevelDifficulty);
		// Clear any errors
		std::cin.clear(); 
		// Discards the buffer 
		std::cin.ignore();

		if (bLevelComplete)
		{
			LevelDifficulty += 1;
		}
		
	}
	std::cout << "\n*** Great work! Now get out of there! ***" << std::endl;
	return 0;
}
