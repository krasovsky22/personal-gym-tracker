# Use an Ubuntu base image
FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    openjdk-11-jdk \
    wget \
    unzip \
    git \
    libgl1-mesa-glx \
    libpulse0 \
    libxcomposite1 \
    libxcursor1 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libasound2 \
    qemu-kvm \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for Android SDK
ENV ANDROID_HOME /opt/android-sdk
ENV PATH ${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools

# Create the Android SDK directory
RUN mkdir -p ${ANDROID_HOME}/cmdline-tools

# Download and install Android SDK Command Line Tools
RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip -O /tmp/tools.zip && \
    unzip /tmp/tools.zip -d /tmp && \
    mv /tmp/tools ${ANDROID_HOME}/cmdline-tools/latest && \
    rm /tmp/tools.zip

# Accept licenses and install Android SDK components
RUN yes | ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager --licenses && \
    ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager "platform-tools" "emulator" "platforms;android-31" "system-images;android-31;google_apis;x86_64"

# Create an Android Virtual Device (AVD)
RUN echo "no" | ${ANDROID_HOME}/cmdline-tools/latest/bin/avdmanager create avd --name "pixel" --device "pixel" --package "system-images;android-31;google_apis;x86_64" --tag "google_apis" --abi "x86_64"

# Expose ADB and emulator ports
EXPOSE 5554 5555

# Start the emulator
CMD ["emulator", "-avd", "pixel", "-no-audio", "-no-boot-anim", "-no-window", "-gpu", "swiftshader_indirect"]
