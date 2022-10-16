// Fill out your copyright notice in the Description page of Project Settings.

#include "MovingPlatform.h"

// Sets default values
AMovingPlatform::AMovingPlatform()
{
	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;
}

// Called when the game starts or when spawned
void AMovingPlatform::BeginPlay()
{
	Super::BeginPlay();

	StartLocation = GetActorLocation();

	FString Name = GetName();

	// Logging
	// LogTemp log category
	// Display logging level
	UE_LOG(LogTemp, Display, TEXT("BeginPlay: %s"), *Name);
	// UE_LOG(LogTemp, Warning, TEXT("Some message"));
	// UE_LOG(LogTemp, Error, TEXT("Some message"));
}

// Called every frame
void AMovingPlatform::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

	MovePlatform(DeltaTime);

	RotatePlatform(DeltaTime);
}

void AMovingPlatform::MovePlatform(float DeltaTime)
{
	// send platform back if gone too far
	// check how far we have moved
	// double DistanceMoved = FVector::Distance(StartLocation, CurrentLocation);
	// DistanceMovedForDisplay = DistanceMoved;

	// reverse direction of motion if gone too far
	if (ShouldPlatformReturn())
	{
		// double OverShoot = DistanceMoved - MoveDistance;
		// FString Name = GetName();
		// UE_LOG(LogTemp, Display, TEXT("%s Platform overshot by %f"), *Name, OverShoot);

		// velocity direction of vector
		FVector MoveDirection = PlatformVelocity.GetSafeNormal();
		StartLocation = StartLocation + (MoveDirection * MoveDistance);
		SetActorLocation(StartLocation);
		// set to reverse, opposite direction
		PlatformVelocity = -PlatformVelocity;
	}
	else // Move platform forwards
	{
		// get current location
		FVector CurrentLocation = GetActorLocation();
		// add vector to that location
		CurrentLocation = CurrentLocation + (PlatformVelocity * DeltaTime);
		// set the location
		SetActorLocation(CurrentLocation);
	}
}

void AMovingPlatform::RotatePlatform(float DeltaTime)
{
	FString Name = GetName();
	UE_LOG(LogTemp, Display, TEXT("%s Rotating..."), *Name);

	AddActorLocalRotation(RotationVelocity * DeltaTime);
}

bool AMovingPlatform::ShouldPlatformReturn() const
{
	// check how far we have moved
	float DistanceMoved = GetDistanceMoved();
	return DistanceMoved > MoveDistance;
}

float AMovingPlatform::GetDistanceMoved() const
{
	return FVector::Distance(StartLocation, GetActorLocation());
}

