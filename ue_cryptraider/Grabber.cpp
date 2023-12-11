// Fill out your copyright notice in the Description page of Project Settings.

#include "Grabber.h"

#include "Engine/World.h"
#include "DrawDebugHelpers.h"
// #include "PhysicsEngine/PhysicsHandleComponent.h"

// Sets default values for this component's properties
UGrabber::UGrabber()
{
	// Set this component to be initialized when the game starts, and to be ticked every frame.  You can turn these features
	// off to improve performance if you don't need them.
	PrimaryComponentTick.bCanEverTick = true;
}

// Called when the game starts
void UGrabber::BeginPlay()
{
	Super::BeginPlay();

	// AActor *Owner = GetOwner();
	// template function
	// UPhysicsHandleComponent *PhysicsHandler = GetPhysicsHandle();
	// if (PhysicsHandler != nullptr)
	// {
	// 	UE_LOG(LogTemp, Display, TEXT("Got Physics handle %s"), *PhysicsHandler->GetName());
	// }
	// else
	// {
	// 	UE_LOG(LogTemp, Warning, TEXT("No Physics handle component found"));
	// }
}

// Called every frame
void UGrabber::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction *ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

	// template function
	UPhysicsHandleComponent *PhysicsHandler = GetPhysicsHandle();
	// if (PhysicsHandler == nullptr)
	// {
	// 	return;
	// }

	// if (PhysicsHandler->GetGrabbedComponent() != nullptr)
	// {
	// 	FVector TargetLocation = GetComponentLocation() + GetForwardVector() * HoldDistance;
	// 	PhysicsHandler->SetTargetLocationAndRotation(TargetLocation, GetComponentRotation());
	// }

	if (PhysicsHandler == nullptr)
	{
		UE_LOG(LogTemp, Display, TEXT("DEBUG Grabber PhysicsHandler is null"));
		return;
	}

	if (PhysicsHandler->GetGrabbedComponent() == nullptr)
	{
		UE_LOG(LogTemp, Display, TEXT("DEBUG Grabber PhysicsHandler Get Grabbed Component is null"));
	}

	if (PhysicsHandler && PhysicsHandler->GetGrabbedComponent())
	{
		FVector TargetLocation = GetComponentLocation() + GetForwardVector() * HoldDistance;
		PhysicsHandler->SetTargetLocationAndRotation(TargetLocation, GetComponentRotation());
	}

	// FRotator MyRotation = GetComponentRotation();
	// FString RotationString = MyRotation.ToCompactString();

	// UE_LOG(LogTemp, Display, TEXT("Grabber rotation %s"), *RotationString);

	// UWorld *World = GetWorld();
	// float Time = World->TimeSeconds;
	// UE_LOG(LogTemp, Display, TEXT("Current time is %f"), Time);

	// turn on Lit, play, and press F8 to eject to see the red debug line
	// UWorld *World = GetWorld();
	// FVector Start = GetComponentLocation();
	// FVector End = Start + GetForwardVector() * MaxGrabDistance;
	// FColor Color = FColor::Red;
	// DrawDebugLine(World, Start, End, Color);

	// FCollisionShape Sphere = FCollisionShape::MakeSphere(GrabRadius);
	// FHitResult HitResult;
	// bool HasHit = World->SweepSingleByChannel(
	// 	HitResult,
	// 	Start,
	// 	End,
	// 	FQuat::Identity,
	// 	ECC_GameTraceChannel2,
	// 	Sphere);

	// if (HasHit)
	// {
	// 	AActor *HitActor = HitResult.GetActor();
	// 	FString Name = HitActor->GetActorNameOrLabel();
	// 	UE_LOG(LogTemp, Display, TEXT("Hit actor name is %s"), *Name);
	// }
	// else
	// {
	// 	UE_LOG(LogTemp, Display, TEXT("Hit nothing"));
	// }

	// float Damage = 0;
	// float &DamageRef = Damage; // a reference to variable
	// UE_LOG(LogTemp, Display, TEXT("DamageRef before change: %f, Damage: %f"), DamageRef, Damage);
	// DamageRef = 6;
	// UE_LOG(LogTemp, Display, TEXT("DamageRef after change: %f, Damage: %f"), DamageRef, Damage);

	// float DamageReference = 10;
	// PrintDamage(DamageReference);
	// UE_LOG(LogTemp, Display, TEXT("Original Damage is %f"), DamageReference);

	// float OutDamage;
	// if (HasDamage(OutDamage))
	// {
	// 	PrintDamage(OutDamage);
	// }
}

void UGrabber::Release()
{
	UPhysicsHandleComponent *PhysicsHandler = GetPhysicsHandle();
	// if (PhysicsHandler == nullptr)
	// {
	// 	return;
	// }

	// if (PhysicsHandler->GetGrabbedComponent() != nullptr)
	// {
	// 	UPrimitiveComponent *GrabbedComponent = PhysicsHandler->GetGrabbedComponent();
	// 	AActor *GrabbedActor = GrabbedComponent->GetOwner();

	// 	GrabbedComponent->WakeAllRigidBodies();
	// 	GrabbedActor->Tags.Remove("Grabbed");

	// 	PhysicsHandler->ReleaseComponent();
	// }

	// if (PhysicsHandler != nullptr && PhysicsHandler->GetGrabbedComponent() != nullptr)
	if (PhysicsHandler && PhysicsHandler->GetGrabbedComponent())
	{
		UPrimitiveComponent *GrabbedComponent = PhysicsHandler->GetGrabbedComponent();
		AActor *GrabbedActor = GrabbedComponent->GetOwner();

		GrabbedComponent->WakeAllRigidBodies();
		GrabbedActor->Tags.Remove("Grabbed");

		PhysicsHandler->ReleaseComponent();
	}

	// UE_LOG(LogTemp, Display, TEXT("Released grabber"));
}

void UGrabber::Grab()
{
	// template function
	UPhysicsHandleComponent *PhysicsHandler = GetPhysicsHandle();
	if (PhysicsHandler == nullptr)
	{
		return;
	}

	// UWorld *World = GetWorld();
	// FVector Start = GetComponentLocation();
	// FVector End = Start + GetForwardVector() * MaxGrabDistance;
	// FColor Color = FColor::Red;
	// DrawDebugLine(World, Start, End, Color);

	// float Radius = 10;
	// int32 Segments = 10;
	// bool bPersistentLines = false;
	// float LifeTime = 5.0;
	// DrawDebugSphere(World, End, Radius, Segments, FColor::Blue, bPersistentLines, LifeTime);

	// FCollisionShape Sphere = FCollisionShape::MakeSphere(GrabRadius);

	FHitResult HitResult;
	bool HasHit = GetGrabbableInReach(HitResult);

	if (HasHit)
	{
		// FRotator GrabberRotation = GetComponentRotation();
		UPrimitiveComponent *HitComponent = HitResult.GetComponent();

		AActor *HitActor = HitResult.GetActor();
		UE_LOG(LogTemp, Display, TEXT("DEBUG Grabber Grab hit result %s"), *HitActor->GetActorNameOrLabel());

		HitComponent->WakeAllRigidBodies();
		HitComponent->SetSimulatePhysics(true);

		HitActor->Tags.Add("Grabbed");
		HitActor->DetachFromActor(FDetachmentTransformRules::KeepWorldTransform);

		PhysicsHandler->GrabComponentAtLocationWithRotation(
			HitComponent,
			NAME_None,
			HitResult.ImpactPoint,
			GetComponentRotation());

		// AActor *HitActor = HitResult.GetActor();
		// FString Name = HitActor->GetActorNameOrLabel();
		// DrawDebugSphere(World, HitResult.Location, Radius, Segments, FColor::Green, bPersistentLines, LifeTime);
		// DrawDebugSphere(World, HitResult.ImpactPoint, Radius, Segments, FColor::Red, bPersistentLines, LifeTime);
		// UE_LOG(LogTemp, Display, TEXT("Hit actor name is %s"), *Name);
	}
	else
	{
		UE_LOG(LogTemp, Display, TEXT("Hit nothing"));
	}
}

UPhysicsHandleComponent *UGrabber::GetPhysicsHandle() const
{
	UPhysicsHandleComponent *PhysicsHandler = GetOwner()->FindComponentByClass<UPhysicsHandleComponent>();
	if (PhysicsHandler == nullptr)
	{
		UE_LOG(LogTemp, Error, TEXT("Grabber requires a UPhysicsHandleComponent."));
	}
	return PhysicsHandler;
}

bool UGrabber::GetGrabbableInReach(FHitResult &OutHitResult) const
{
	UWorld *World = GetWorld();
	FVector Start = GetComponentLocation();
	FVector End = Start + GetForwardVector() * MaxGrabDistance;
	FColor Color = FColor::Red;
	DrawDebugLine(World, Start, End, Color);

	float Radius = 10; // 2382.0
	int32 Segments = 10;
	bool bPersistentLines = false;
	float LifeTime = 5.0;
	DrawDebugSphere(World, End, Radius, Segments, FColor::Blue, bPersistentLines, LifeTime);

	FCollisionShape Sphere = FCollisionShape::MakeSphere(GrabRadius);
	return World->SweepSingleByChannel(
		OutHitResult,
		Start,
		End,
		FQuat::Identity,
		ECC_GameTraceChannel2,
		Sphere);
}

// void UGrabber::PrintDamage(const float &DamageReference)
// {
// 	// DamageReference = 9; // change the DamageReference to 9 from original value
// 	UE_LOG(LogTemp, Display, TEXT("Damage is %f"), DamageReference);
// }

// bool UGrabber::HasDamage(float &OutDamage)
// {
// 	OutDamage = 1;
// 	return true;
// }
