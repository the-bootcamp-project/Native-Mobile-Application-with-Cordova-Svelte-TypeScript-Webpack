FROM tbcp/nodejs:ubuntu

USER bootcamp

# Install software-properties-common git curl wget python
RUN sudo apt update && \
    sudo apt install -y software-properties-common git curl wget python

# Install OpenJDK
RUN sudo apt install -y openjdk-8-jdk
# Setup JAVA_HOME -- useful for docker commandline
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
ENV PATH $JAVA_HOME/bin:$PATH
RUN sudo update-java-alternatives --set java-1.8.0-openjdk-amd64

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
ENV PATH $ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/tools:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$PATH

RUN yes Y | sudo ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/sdkmanager --install "platforms;android-29" "build-tools;29.0.2"

# RUN yes Y | sudo ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/sdkmanager --install "platform-tools" \
#                                                                                     "platforms;android-29" \
#                                                                                     "build-tools;29.0.2" \
#                                                                                     "system-images;android-29;google_apis;x86" \
#                                                                                     "emulator"

WORKDIR /home/bootcamp/

RUN sudo yarn global add cordova --prefix /usr/local

RUN cordova telemetry off

##  && \
## echo "no" | ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/avdmanager --verbose create avd --force --name "test" --device "pixel" --package "system-images;android-29;google_apis;x86" --tag "google_apis" --abi "x86" && \
#    yes Y | sudo ${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/sdkmanager --licenses

# clean up
RUN sudo rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    sudo apt autoremove -y && \
    sudo apt clean
