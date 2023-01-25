// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "HealthComponent.generated.h"

/**
 * This is health actor component.
 */
UCLASS(ClassGroup = (Custom), meta = (BlueprintSpawnableComponent))
class TOONTANKS_API UHealthComponent : public UActorComponent
{
	GENERATED_BODY()

public:
	// Sets default values for this component's properties
	UHealthComponent();

protected:
	// Called when the game starts
	virtual void BeginPlay() override;

public:
	// Called every frame
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction *ThisTickFunction) override;

private:
	UPROPERTY(EditAnywhere)
	float MaxHealth = 100.f;

	// current health
	float Health = 0;

	// Callback function for binding to the delegate
	UFUNCTION()
	void DamageTaken(
		// it is the actor taking the damage
		AActor *DamagedActor,
		// actual damage amount
		float Damage,
		// indicates type of damage by UE
		const UDamageType *DamageType,
		// a controller that is responsible for the damage,
		// for example, in case it is the player causes any damage, AController is the controller that possesses the player
		// if there is no instigator, then this pointer is null
		class AController *Instigator,
		// actual actor that causes the damage, for example, the projectile itself
		AActor *DamageCauser);

	// access Toon Tanks game mode
	class AToonTanksGameMode *ToonTanksGameMode;
};
