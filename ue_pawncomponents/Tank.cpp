// Fill out your copyright notice in the Description page of Project Settings.

#include "Tank.h"
#include "GameFramework/SpringArmComponent.h"
#include "Camera/CameraComponent.h"
#include "Components/InputComponent.h"
#include "Kismet/GameplayStatics.h"

// Sets default values
ATank::ATank()
{
    SpringArmComponent = CreateDefaultSubobject<USpringArmComponent>(TEXT("Spring Arm"));
    SpringArmComponent->SetupAttachment(RootComponent);

    CameraComponent = CreateDefaultSubobject<UCameraComponent>(TEXT("Camera"));
    CameraComponent->SetupAttachment(SpringArmComponent);
}

// Called to bind functionality to input
void ATank::SetupPlayerInputComponent(UInputComponent *PlayerInputComponent)
{
    Super::SetupPlayerInputComponent(PlayerInputComponent);

    // TEXT("MoveForward"), name of axis mappings in project setting -> input
    // bind this pawn component
    // &ATank::Move, address of Tank's move function
    PlayerInputComponent->BindAxis(TEXT("MoveForward"), this, &ATank::Move);
    // &ATank::Turn, address of Tank's turn function
    PlayerInputComponent->BindAxis(TEXT("Turn"), this, &ATank::Turn);
}

void ATank::Move(float Value)
{
    // UE_LOG(LogTemp, Display, TEXT("Value is %f"), Value);

    // need to initialize to zero vector
    FVector DeltaLocation = FVector::ZeroVector;
    float DeltaTime = UGameplayStatics::GetWorldDeltaSeconds(this);
    // X = Value * DeltaTime * Speed
    DeltaLocation.X = Value * Speed * DeltaTime;
    // World and local space, need to use local space to move pawn component
    // enable sweep to enable blocking, not going through
    // only check if the root component is blocking
    AddActorLocalOffset(DeltaLocation, true);
}

void ATank::Turn(float Value)
{
    // need to initialize to zero rotator
    FRotator DeltaRotation = FRotator::ZeroRotator;
    float DeltaTime = UGameplayStatics::GetWorldDeltaSeconds(this);
    // Yaw = Value * DeltaTime * TurnRate
    DeltaRotation.Yaw = Value * DeltaTime * TurnRate;
    // World and local space, need to use local space to turn pawn component
    // enable sweep to enable blocking, not going through
    // only check if the root component is blocking
    AddActorLocalRotation(DeltaRotation, true);
}
