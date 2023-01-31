// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Pawn.h"
#include "BasePawn.generated.h"

UCLASS()
class TOONTANKS_API ABasePawn : public APawn
{
	GENERATED_BODY()

public:
	// Sets default values for this pawn's properties
	ABasePawn();

	UPROPERTY(VisibleAnywhere, BlueprintReadWrite) // BlueprintReadWrite to expose to event graph, cannot be private
	int32 VisibleAnywhereInt = 100;

	UPROPERTY(EditAnywhere, BlueprintReadOnly)
	int32 EditAnywhereInt = 100;

	UPROPERTY(VisibleInstanceOnly) // instance only, by dragging into unreal engine editor
	int32 VisibleInstanceOnlyInt = 100;

	UPROPERTY(VisibleDefaultsOnly) // only visible to default's detail panel
	int32 VisibleDefaultsOnlyInt = 10;

	UPROPERTY(EditDefaultsOnly)
	int32 EditDefaultsOnlyInt = 9;

	UPROPERTY(EditInstanceOnly)
	int32 EditInstanceOnlyInt = 19;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	float BasePawnSpeed = 200.f;

	// inherited by Tank and Tower and call in Game Mode class
	// handles the destruction of this pawn
	void HandleDestruction();

protected:
	void RotateTurret(FVector LookAtTarget);

	void Fire();

private:
	// Cpp forward declaration, to avoid including UCapsuleComponent header file to keep this header file simpler
	// but this is incomplete type
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
	class UCapsuleComponent *CapsuleComponent;

	// UStaticMeshComponent is included in parent APawn class
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
	UStaticMeshComponent *BaseMeshComponent;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
	UStaticMeshComponent *TurretMeshComponent;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
	USceneComponent *ProjectileSpawnPoint;

	// expose private to event graph
	UPROPERTY(VisibleAnywhere, BlueprintReadWrite, Category = "Super Variables", meta = (AllowPrivateAccess = "true"))
	int32 VisibleAnywhereIntPrivate = 100;

	// expose private to event graph
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Super Variables", meta = (AllowPrivateAccess = "true"))
	int32 EditAnywhereIntPrivate = 100;

	// Forward declare
	UPROPERTY(EditDefaultsOnly, Category = "Combat")
	TSubclassOf<class AProjectile> ProjectileClass; // set based on projectile class type

	// hit effect
	UPROPERTY(EditAnywhere, Category = "Combat")
	class UParticleSystem *HitParticles;

	// hit sound
	UPROPERTY(EditAnywhere, Category = "Combat")
	class USoundBase *HitSound;

	UPROPERTY(EditAnywhere, Category = "Combat")
	TSubclassOf<class UCameraShakeBase> DestoryedCameraShakeClass;
};
