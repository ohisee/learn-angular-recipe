// Fill out your copyright notice in the Description page of Project Settings.

#include "Tower.h"
#include "Tank.h"
#include "Kismet/GameplayStatics.h"
#include "TimerManager.h"

// Called every frame
void ATower::Tick(float DeltaTime)
{
    Super::Tick(DeltaTime);

    // find the distance to the tank
    if (InFireRange())
    {
        // if in range, rotate turret toward Tank
        RotateTurret(Tank->GetActorLocation());
    }
}

// handles the destruction of Tower
void ATower::HandleDestruction()
{
    Super::HandleDestruction();
    Destroy();
}

void ATower::BeginPlay()
{
    Super::BeginPlay();

    // Get player pawn at index 0, there is only one player, at index 0
    Tank = Cast<ATank>(UGameplayStatics::GetPlayerPawn(this, 0));

    // Called every FireRate, 2, seconds
    GetWorldTimerManager().SetTimer(
        // out parameter
        FireRateTimeHandle,
        this,
        // Callback function
        &ATower::CheckFIreCondition,
        // the amount of time (in seconds) between set and firing.
        FireRate,
        // set true to loop
        true);
}

void ATower::CheckFIreCondition()
{
    if (Tank == nullptr)
    {
        return;
    }

    if (InFireRange() && Tank->bAlive)
    {
        Fire();
    }
}

bool ATower::InFireRange()
{
    if (Tank != nullptr)
    {
        // find the distance to the tank
        float Distance = FVector::Distance(GetActorLocation(), Tank->GetActorLocation());
        // check to see if the Tank is in range
        if (Distance <= FireRange)
        {
            return true;
        }
    }
    return false;
}
