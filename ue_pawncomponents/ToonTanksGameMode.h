// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "ToonTanksGameMode.generated.h"

/**
 * Game mode base, defines rules of the game and win conditions
 */
UCLASS()
class TOONTANKS_API AToonTanksGameMode : public AGameModeBase
{
	GENERATED_BODY()

public:
	void ActorDestoryed(AActor *DeadActor);

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	UFUNCTION(BlueprintImplementableEvent)
	void StartGame();

	UFUNCTION(BlueprintImplementableEvent)
	void GameOver(bool bWonGame);

private:
	class ATank *Tank;

	class AToonTanksPlayerController *ToonTanksPlayerController;

	// wait for 3 seconds before start game
	float StartDelay = 3.f;

	void HandleGameStart();

	int32 TargetTowers = 0;

	int32 GetTargetTowerCount();
};
