// Fill out your copyright notice in the Description page of Project Settings.

#include "ToonTanksGameMode.h"
#include "Kismet/GameplayStatics.h"
#include "Tank.h"
#include "Tower.h"
#include "ToonTanksPlayerController.h"
#include "TimerManager.h"

// handle actor destoryed feature
void AToonTanksGameMode::ActorDestoryed(AActor *DeadActor)
{
    if (DeadActor == Tank)
    {
        Tank->HandleDestruction();
        // if (Tank->GetTankPlayerController())
        if (ToonTanksPlayerController != nullptr)
        {
            // disable Tank's player controller input
            // Tank->DisableInput(Tank->GetTankPlayerController());
            // make sure player controller mouse is not showed
            // Tank->GetTankPlayerController()->bShowMouseCursor = false;

            ToonTanksPlayerController->SetPlayerEnabledState(false);
        }

        // this is an event and is implemented in blueprint
        GameOver(false);
    }
    else if (ATower *DestoryedTower = Cast<ATower>(DeadActor))
    {
        DestoryedTower->HandleDestruction();

        TargetTowers = TargetTowers - 1;

        if (TargetTowers == 0)
        {
            // this is an event and is implemented in blueprint
            GameOver(true);
        }
    }
}

void AToonTanksGameMode::BeginPlay()
{
    Super::BeginPlay();

    HandleGameStart();
}

void AToonTanksGameMode::HandleGameStart()
{
    // at game start, get number of Towers
    TargetTowers = GetTargetTowerCount();

    // Tank is a player
    // Get Tank at index 0
    Tank = Cast<ATank>(UGameplayStatics::GetPlayerPawn(this, 0));

    // Get Tank player controller at index 0
    ToonTanksPlayerController = Cast<AToonTanksPlayerController>(UGameplayStatics::GetPlayerController(this, 0));

    // this is an event and is implemented in blueprint
    StartGame();

    if (ToonTanksPlayerController != nullptr)
    {
        // at start, disable Tank player
        ToonTanksPlayerController->SetPlayerEnabledState(false);

        // start count down timer
        FTimerHandle PlayerEnableTimerHandle;

        // timer delegate
        FTimerDelegate PlayerEnableTimerDelegate = FTimerDelegate::CreateUObject(
            ToonTanksPlayerController,
            &AToonTanksPlayerController::SetPlayerEnabledState,
            true);

        GetWorldTimerManager().SetTimer(
            PlayerEnableTimerHandle,
            PlayerEnableTimerDelegate,
            StartDelay,
            false // no loop
        );
    }
}

// find out how many Towers there are
int32 AToonTanksGameMode::GetTargetTowerCount()
{
    TArray<AActor *> Towers;

    UGameplayStatics::GetAllActorsOfClass(this, ATower::StaticClass(), Towers);

    return Towers.Num();
}
