// Fill out your copyright notice in the Description page of Project Settings.

#include "ToonTanksGameMode.h"
#include "Kismet/GameplayStatics.h"
#include "Tank.h"
#include "Tower.h"
#include "ToonTanksPlayerController.h"

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
    }
    else if (ATower *DestoryedTower = Cast<ATower>(DeadActor))
    {
        DestoryedTower->HandleDestruction();
    }
}

void AToonTanksGameMode::BeginPlay()
{
    Super::BeginPlay();

    HandleGameStart();
}

void AToonTanksGameMode::HandleGameStart()
{
    // Tank is a player
    // Get Tank at index 0
    Tank = Cast<ATank>(UGameplayStatics::GetPlayerPawn(this, 0));

    // Get Tank player controller at index 0
    ToonTanksPlayerController = Cast<AToonTanksPlayerController>(UGameplayStatics::GetPlayerController(this, 0));

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
