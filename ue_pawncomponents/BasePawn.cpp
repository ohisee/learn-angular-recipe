// Fill out your copyright notice in the Description page of Project Settings.

#include "BasePawn.h"
#include "Components/CapsuleComponent.h"
#include "Components/StaticMeshComponent.h"
#include "Kismet/GameplayStatics.h"
#include "Projectile.h"
#include "Particles/ParticleSystem.h"

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

	// must set project spawn point away, not too close, to the component
	ProjectileSpawnPoint = CreateDefaultSubobject<USceneComponent>(TEXT("Spawn Point"));
	ProjectileSpawnPoint->SetupAttachment(TurretMeshComponent);
}

// inherited by Tank and Tower and call in Game Mode class
// handles the destruction of this pawn
void ABasePawn::HandleDestruction()
{
	// handles visual and sound effects
	if (HitParticles != nullptr)
	{
		UGameplayStatics::SpawnEmitterAtLocation(this, HitParticles, GetActorLocation(), GetActorRotation());
	}

	if (HitSound != nullptr)
	{
		UGameplayStatics::PlaySoundAtLocation(this, HitSound, GetActorLocation());
	}

	if (DestoryedCameraShakeClass != nullptr)
	{
		GetWorld()->GetFirstPlayerController()->ClientStartCameraShake(DestoryedCameraShakeClass);
	}
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

// fire projectile
void ABasePawn::Fire()
{
	FVector ProjectileSpawnPointLocation = ProjectileSpawnPoint->GetComponentLocation();
	FRotator ProjectileSpawnPointRotation = ProjectileSpawnPoint->GetComponentRotation();
	// DrawDebugSphere(
	// 	GetWorld(),
	// 	ProjectileSpawnPointLocation,
	// 	25.f,
	// 	12,
	// 	FColor::Red,
	// 	false,
	// 	3.f);

	// Spawn blue print projectile class
	// auto allows the compiler to figure out its type
	// auto Projectile is same as AProjectile *Projectile and auto is for Cpp
	AProjectile *Projectile = GetWorld()->SpawnActor<AProjectile>(
		ProjectileClass,
		ProjectileSpawnPointLocation,
		ProjectileSpawnPointRotation);

	// owner is set to the pawn that spawns this projectile
	// will get the instance of pawn class that owns this projectile
	Projectile->SetOwner(this);
}
