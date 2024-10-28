FROM quay.io/operator-framework/ansible-operator:v1.33.0

# Set environment variables
ENV HOME /home/ansible

# Switch to the root user to perform operations that require elevated permissions
USER root

# Create a non-root user and set home directory
RUN useradd -m ansible-user

# Copy requirements.yml and install collections
COPY requirements.yml ${HOME}/requirements.yml
RUN ansible-galaxy collection install -r ${HOME}/requirements.yml \
    && chmod -R ug+rwx ${HOME}/.ansible

# Copy other necessary files
COPY watches.yaml ${HOME}/watches.yaml
COPY roles/ ${HOME}/roles/
COPY playbooks/ ${HOME}/playbooks/

# Switch to the non-root user
USER ansible-user

# Set the working directory (if needed)
WORKDIR ${HOME}