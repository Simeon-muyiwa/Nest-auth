FROM quay.io/operator-framework/ansible-operator:v1.33.0

COPY requirements.yml ${HOME}/requirements.yml
RUN ansible-galaxy collection install -r ${HOME}/requirements.yml \
    && chmod -R ug+rwx ${HOME}/.ansible

COPY watches.yaml ${HOME}/watches.yaml
COPY roles/ ${HOME}/roles/
COPY playbooks/ ${HOME}/playbooks/

# Create ansible.cfg
RUN echo "[defaults]\nroles_path = /opt/ansible/roles\nlibrary = /usr/share/ansible/openshift\nlocal_tmp = /tmp/.ansible\nremote_tmp = /tmp/.ansible" > /etc/ansible/ansible.cfg

# Set the command to run the playbook
CMD ["ansible-playbook", "-vvv", "/opt/ansible/playbooks/nestjs.yml"]
