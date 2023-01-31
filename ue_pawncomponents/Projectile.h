// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "Projectile.generated.h"

/**
 * Basic actor class, can be placed or spawned in the world
 */
UCLASS()
class TOONTANKS_API AProjectile : public AActor
{
	GENERATED_BODY()

public:
	// Sets default values for this actor's properties
	AProjectile();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:
	// Called every frame
	virtual void Tick(float DeltaTime) override;

private:
	UPROPERTY(EditDefaultsOnly, Category = "Combat")
	UStaticMeshComponent *ProjectileMeshComponent;

	UPROPERTY(VisibleAnywhere, Category = "Movement")
	class UProjectileMovementComponent *ProjectileMovementComponent;

	// Callback function for Hit Event, must use UFUNCTION() micro
	UFUNCTION()
	void OnHit(
		// this is the component doing the hitting
		UPrimitiveComponent *HitComponent,
		// this is the actor that got hit
		AActor *OtherActor,
		// this is the other component that got hit, this component is owned by the AActor *OtherActor
		UPrimitiveComponent *OtherComponent,
		// impulse vector
		FVector NormalImpulse,
		const FHitResult &Hit);

	UPROPERTY(EditAnywhere)
	float Damage = 50.f;

	// hit effect
	UPROPERTY(EditAnywhere, Category = "Combat")
	class UParticleSystem *HitParticles;

	// trail effect
	UPROPERTY(EditAnywhere, Category = "Combat")
	class UParticleSystemComponent *TrailParticlesComponent;

	UPROPERTY(EditAnywhere, Category = "Combat")
	class USoundBase *LaunchSound;

	UPROPERTY(EditAnywhere, Category = "Combat")
	class USoundBase *HitSound;

	UPROPERTY(EditAnywhere, Category = "Combat")
	TSubclassOf<class UCameraShakeBase> HitCameraShakeClass;
};
