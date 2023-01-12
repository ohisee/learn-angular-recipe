// Fill out your copyright notice in the Description page of Project Settings.

#include "BasePawn.h"
#include "Components/CapsuleComponent.h"
#include "Kismet/GameplayStatics.h"

// Sets default values
ABasePawn::ABasePawn()
{
	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	// This base pawn has a RootComponent which is a type of scene component, USceneComponent
	// This RootComponent is invisible, with no visual representation
	// RootComponent;
	// create attachment, including Capsule collision
	CapsuleComponent = CreateDefaultSubobject<UCapsuleComponent>(TEXT("Capsule Collider"));
	// assign capsule component as RootComponent
	RootComponent = CapsuleComponent;

	BaseMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Base Mesh"));
	BaseMeshComponent->SetupAttachment(CapsuleComponent);

	TurretMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Turret Mesh"));
	TurretMeshComponent->SetupAttachment(BaseMeshComponent);

	ProjectileSpawnPoint = CreateDefaultSubobject<USceneComponent>(TEXT("Spawn Point"));
	ProjectileSpawnPoint->SetupAttachment(TurretMeshComponent);
}

// rotate turret component
void ABasePawn::RotateTurret(FVector LookAtTarget)
{
	// vector from turret component location to look at target
	// ToTarget is a world space location
	FVector ToTarget = LookAtTarget - TurretMeshComponent->GetComponentLocation();
	// only need to set rotation's Yaw, Pitch and Roll should be zero
	// LookAtRotationis a world space rotation
	FRotator LookAtRotation = FRotator(0.f, ToTarget.Rotation().Yaw, 0.f);

	TurretMeshComponent->SetWorldRotation(
		// Interpolate rotator, to have smooth rotation
		FMath::RInterpTo(
			TurretMeshComponent->GetComponentRotation(),
			LookAtRotation,
			// get delta time
			UGameplayStatics::GetWorldDeltaSeconds(this),
			// speed
			20.f));
}