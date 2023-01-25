// Fill out your copyright notice in the Description page of Project Settings.

#include "Projectile.h"
#include "Components/StaticMeshComponent.h"
#include "GameFramework/ProjectileMovementComponent.h"
#include "GameFramework/DamageType.h"
#include "Kismet/GameplayStatics.h"

// Sets default values
AProjectile::AProjectile()
{
	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = false;

	ProjectileMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Projectile Mesh"));
	RootComponent = ProjectileMeshComponent;

	ProjectileMovementComponent = CreateDefaultSubobject<UProjectileMovementComponent>(TEXT("Projectile Movement Component"));
	ProjectileMovementComponent->MaxSpeed = 1300.f;
	ProjectileMovementComponent->InitialSpeed = 1300.f;
}

// Called when the game starts or when spawned
void AProjectile::BeginPlay()
{
	Super::BeginPlay();

	// need to manually type in OnComponentHit.AddDynamic, IDE does not find AddDynamic
	// AddDynamic, a helper to bind a member UFUNCTION() to a dynamic multi-cast delegate
	ProjectileMeshComponent->OnComponentHit.AddDynamic(this, &AProjectile::OnHit);
}

// Called every frame
void AProjectile::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
}

// Callback function for Hit Event,
// need to bind this function to the delegate in BeginPlay
void AProjectile::OnHit(UPrimitiveComponent *HitComponent,
						AActor *OtherActor,
						UPrimitiveComponent *OtherComponent,
						FVector NormalImpulse,
						const FHitResult &Hit)
{
	UE_LOG(
		LogTemp,
		Display,
		TEXT("Hit Component name %s, Other Actor name %s, Other Component name %s"),
		*HitComponent->GetName(),
		*OtherActor->GetName(),
		*OtherComponent->GetName());

	auto MyOwner = GetOwner(); // this is instigator
	if (MyOwner == nullptr)
	{
		return;
	}

	auto MyOwnerInstigator = MyOwner->GetInstigatorController();
	// use StaticClass to the UClass
	auto DamageTypeClass = UDamageType::StaticClass();

	// make sure OtherActor is not null
	// and OtherActor is not projectile itself to avoid causing damage to projectile itself
	// and OtherActor is not its owner to avoid causing damage to projectile's owner
	if (OtherActor != nullptr && OtherActor != this && OtherActor != MyOwner)
	{
		// will generate damage event,
		// then OnTakeAnyDamage delegate will broadcase and response to this event,
		// and then HealthComponent's DamageTaken callback function will be called
		UGameplayStatics::ApplyDamage(OtherActor, Damage, MyOwnerInstigator, this, DamageTypeClass);
		// remove projectile
		Destroy();
	}
}
