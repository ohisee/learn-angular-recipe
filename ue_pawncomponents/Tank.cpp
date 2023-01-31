// Fill out your copyright notice in the Description page of Project Settings.

#include "Tank.h"
#include "GameFramework/SpringArmComponent.h"
#include "Camera/CameraComponent.h"
#include "Components/InputComponent.h"
#include "Kismet/GameplayStatics.h"
// #include "DrawDebugHelpers.h" // DrawDebugHelpers.h is included by default

// Sets default values
ATank::ATank()
{
    SpringArmComponent = CreateDefaultSubobject<USpringArmComponent>(TEXT("Spring Arm"));
    SpringArmComponent->SetupAttachment(RootComponent);

    CameraComponent = CreateDefaultSubobject<UCameraComponent>(TEXT("Camera"));
    CameraComponent->SetupAttachment(SpringArmComponent);
}

// handles the destruction of Tank
void ATank::HandleDestruction()
{
    Super::HandleDestruction();
    // hide this Tank, do not destory
    SetActorHiddenInGame(true);
    // disable Tank's Tick function
    SetActorTickEnabled(false);
    // Set alive to false
    bAlive = false;
}

// Called when the game starts or when spawned
void ATank::BeginPlay()
{
    Super::BeginPlay();

    // cannot store a pointer of parent type in child type, must use Cast function
    PlayerController = Cast<APlayerController>(GetController());

    // UWorld *World = GetWorld();
    // FVector TankCenterLocation = GetActorLocation();
    // DrawDebugSphere(
    //     World,
    //     // Tank location plus vector to get raised up 200 unit in Z axis
    //     TankCenterLocation + FVector(0.f, 0.f, 200.f),
    //     // radius of 100
    //     100.f,
    //     // number of segments
    //     12,
    //     FColor::Red,
    //     // true to get persistent line
    //     true,
    //     // duration lifetime of debug sphere
    //     30.f);
}

// Called every frame
void ATank::Tick(float DeltaTime)
{
    Super::Tick(DeltaTime);

    // Get hit result
    if (PlayerController != nullptr)
    {
        FHitResult HitResult;
        PlayerController->GetHitResultUnderCursor(
            // use ECC_Visibility ECollisionChannel
            ECollisionChannel::ECC_Visibility,
            // false to trace simple, true to tract complex
            false,
            // out parameter
            HitResult);

        // UWorld *World = GetWorld();
        // draw a debug sphere under the cursor
        // DrawDebugSphere(
        //     World,
        //     HitResult.ImpactPoint,
        //     // radius of 25
        //     25.f,
        //     // number of segments
        //     12,
        //     FColor::Red,
        //     // persistent line
        //     false,
        //     // duration lifetime of debug sphere
        //     -1.f);

        RotateTurret(HitResult.ImpactPoint);
    }
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
    // bind action, fire when button pressed
    PlayerInputComponent->BindAction(TEXT("Fire"), EInputEvent::IE_Pressed, this, &ATank::Fire);
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
