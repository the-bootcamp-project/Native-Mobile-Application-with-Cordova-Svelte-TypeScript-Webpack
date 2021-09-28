FROM tbcp/nodejs:ubuntu

USER bootcamp

# Install software-properties-common git curl wget python
RUN sudo apt update && \
    sudo apt install -y software-properties-common git curl wget python

# Install Libaries
RUN sudo apt install -y libglu1 libpulse-dev libasound2 libc6  libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxi6  libxtst6 libnss3

# Install OpenJDK
RUN sudo apt install -y openjdk-8-jdk
# Setup JAVA_HOME -- useful for docker commandline
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
ENV PATH ${PATH}:${JAVA_HOME}/bin

# Install Android SDK
RUN sudo apt install -y android-sdk
#Set ANDROID_SDK_ROOT environment variable
ENV ANDROID_SDK_ROOT /usr/lib/android-sdk

RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip -O android-commandline-tools.zip && \
    sudo mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    sudo unzip -q android-commandline-tools.zip -d /tmp/ && \
    sudo mv /tmp/cmdline-tools/ ${ANDROID_SDK_ROOT}/cmdline-tools/latest && \
    sudo rm android-commandline-tools.zip

#Add ANDROID_SDK_ROOT to PATH
ENV PATH ${PATH}:${ANDROID_SDK_ROOT}/platform-tools:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin

RUN yes Y | sudo ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/sdkmanager --install "platform-tools" \
                                                                                    "system-images;android-29;google_apis;x86" \
                                                                                    "build-tools;29.0.2" \
                                                                                    "platforms;android-29" \
                                                                                    "emulator" && \
    yes Y | sudo ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/sdkmanager --licenses

WORKDIR /home/bootcamp/

RUN sudo yarn global add cordova --prefix /usr/local

RUN cordova telemetry off

##  && \
## echo "no" | ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/avdmanager --verbose create avd --force --name "test" --device "pixel" --package "system-images;android-29;google_apis;x86" --tag "google_apis" --abi "x86"
