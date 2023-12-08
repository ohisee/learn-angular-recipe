// Fill out your copyright notice in the Description page of Project Settings.

#include "Mover.h"
#include "Math/UnrealMathUtility.h"

// Sets default values for this component's properties
UMover::UMover()
{
	// Set this component to be initialized when the game starts, and to be ticked every frame.  You can turn these features
	// off to improve performance if you don't need them.
	PrimaryComponentTick.bCanEverTick = true;

	// ...
}

// Called when the game starts
void UMover::BeginPlay()
{
	Super::BeginPlay();

	AActor *Owner = GetOwner();
	// location of actor at game starting
	OriginalLocation = Owner->GetActorLocation();
}

// Called every frame
void UMover::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction *ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

	FVector TargetLocation = OriginalLocation;
	// FVector TargetLocation = OriginalLocation + MoveOffset;

	if (ShouldMove)
	{
		TargetLocation = OriginalLocation + MoveOffset;
	}

	AActor *Owner = GetOwner();
	FVector CurrentLocation = Owner->GetActorLocation();
	if (MoveTime != 0)
	{
		float Speed = MoveOffset.Length() / MoveTime;
		// float Speed = FVector::Distance(OriginalLocation, TargetLocation) / MoveTime;
		FVector NewLocation = FMath::VInterpConstantTo(CurrentLocation, TargetLocation, DeltaTime, Speed);
		Owner->SetActorLocation(NewLocation);
	}

	UE_LOG(LogTemp, Display,
		   TEXT("DEBUG Mover owner is %s and Should Move is %s"),
		   *Owner->GetActorNameOrLabel(), (ShouldMove ? TEXT("true") : TEXT("false")));

	// owner's pointer
	// AActor *Owner = GetOwner();

	// FString Name = (*Owner).GetActorNameOrLabel();
	// FString Name = Owner->GetActorNameOrLabel();

	// FVector OwnerLocation = Owner->GetActorLocation();
	// FString Location = OwnerLocation.ToCompactString();

	// UE_LOG(LogTemp, Display, TEXT("Mover owner address is %u"), Owner);
	// UE_LOG(LogTemp,
	// 	   Display,
	// 	   TEXT("Name of actor which this mover is attached to is %s with location %s"), *Name, *Location);

	/* review of pointer and deference
	float MyFloat = 11.1;
	float *YourFloat = &MyFloat;
	float FloatValue = *YourFloat;
	UE_LOG(LogTemp, Display, TEXT("Mover owner address is %s"), *YourFloat);
	*/
}

void UMover::SetShouldMove(bool NewShouldMove)
{
	ShouldMove = NewShouldMove;
}
