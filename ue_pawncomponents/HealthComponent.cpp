// Fill out your copyright notice in the Description page of Project Settings.

#include "HealthComponent.h"
#include "Kismet/GameplayStatics.h"
#include "ToonTanksGameMode.h"

// Sets default values for this component's properties
UHealthComponent::UHealthComponent()
{
	// Set this component to be initialized when the game starts, and to be ticked every frame.  You can turn these features
	// off to improve performance if you don't need them.
	PrimaryComponentTick.bCanEverTick = true;

	// ...
}

// Called when the game starts
void UHealthComponent::BeginPlay()
{
	Super::BeginPlay();

	Health = MaxHealth;

	// need to manually type in OnTakeAnyDamage.AddDynamic, IDE does not find AddDynamic
	GetOwner()->OnTakeAnyDamage.AddDynamic(this, &UHealthComponent::DamageTaken);

	// get Toon Tanks game mode
	ToonTanksGameMode = Cast<AToonTanksGameMode>(UGameplayStatics::GetGameMode(this));
}

// Called every frame
void UHealthComponent::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction *ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);
}

// Callback function
// bind this callback function to the delegate of the pawn actor that owns this health component
// use GetOwner() in BeginPlay
void UHealthComponent::DamageTaken(AActor *DamagedActor,
								   float Damage,
								   const UDamageType *DamageType,
								   class AController *Instigator,
								   AActor *DamageCauser)
{
	if (Damage <= 0.f)
	{
		return;
	}

	Health = Health - Damage;
	UE_LOG(LogTemp, Display, TEXT("Health is %f"), Health);
	if (ToonTanksGameMode != nullptr && Health <= 0.f)
	{
		ToonTanksGameMode->ActorDestoryed(DamagedActor);
	}
}
