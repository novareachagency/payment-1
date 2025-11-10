
        document.addEventListener('DOMContentLoaded', function() {
            const materialsContainer = document.getElementById('materialsContainer');
            const addMaterialBtn = document.getElementById('addMaterialBtn');
            const materialsHeader = document.querySelector('.materials-header h2');
            const materialCounter = document.querySelector('.material-counter');
            const totalAmountElement = document.querySelector('.total-amount');
            let materialCount = 1;
            
            // Calculate total amount
            function calculateTotal() {
                let total = 0;
                document.querySelectorAll('.material-item').forEach(item => {
                    const quantity = parseFloat(item.querySelector('.material-quantity').value) || 0;
                    const price = parseFloat(item.querySelector('.material-price').value) || 0;
                    const rent = parseFloat(item.querySelector('.material-rent').value) || 1;
                    total += quantity * price * rent;
                });
                totalAmountElement.textContent = `$${total.toFixed(2)}`;
            }
            
            // Add material functionality
            addMaterialBtn.addEventListener('click', function() {
                if (materialCount >= 10) {
                    alert('Maximum 10 materials allowed');
                    return;
                }
                
                materialCount++;
                const newMaterial = document.createElement('div');
                newMaterial.className = 'material-item';
                newMaterial.setAttribute('data-index', materialCount);
                newMaterial.innerHTML = `
                    <div class="form-group">
                        <label>Material Name</label>
                        <input type="text" placeholder="e.g., Cement, Steel, Ladder" class="material-name" name="material_name" required>
                    </div>
                    <div class="form-group">
                        <label>Quantity</label>
                        <input type="number" placeholder="Quantity" class="material-quantity" name="quantity" min="1" required>
                    </div>
                    <div class="form-group">
                        <label>Price per Unit ($)</label>
                        <input type="number" placeholder="Price" class="material-price" name="price" min="0" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label>Rental Period (masyashya)</label>
                        <input type="number" placeholder="masyashya" class="material-rent" name="rent_period" min="1" required>
                    </div>
                    <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
                `;
                materialsContainer.appendChild(newMaterial);
                materialCounter.textContent = `${materialCount}/10 Materials`;
                
                // Add event listener to the new remove button
                const removeBtn = newMaterial.querySelector('.remove-btn');
                removeBtn.addEventListener('click', removeMaterial);
                
                // Add event listeners for price calculation
                const quantityInput = newMaterial.querySelector('.material-quantity');
                const priceInput = newMaterial.querySelector('.material-price');
                const rentInput = newMaterial.querySelector('.material-rent');
                quantityInput.addEventListener('input', calculateTotal);
                priceInput.addEventListener('input', calculateTotal);
                rentInput.addEventListener('input', calculateTotal);
            });
            
            // Remove material functionality
            function removeMaterial(e) {
                const materialItem = e.target.closest('.material-item');
                if (materialItem) {
                    materialItem.remove();
                    materialCount = document.querySelectorAll('.material-item').length;
                    materialCounter.textContent = `${materialCount}/10 Materials`;
                    calculateTotal();
                }
            }
            
            // Add event listeners to existing remove buttons (for dynamically added ones)
            materialsContainer.addEventListener('click', function(e) {
                if (e.target.closest('.remove-btn')) {
                    removeMaterial(e);
                }
            });
            
            // Add event listeners to initial inputs
            document.querySelector('.material-quantity').addEventListener('input', calculateTotal);
            document.querySelector('.material-price').addEventListener('input', calculateTotal);
            document.querySelector('.material-rent').addEventListener('input', calculateTotal);
            
            // Payment method selection
            const paymentOptions = document.querySelectorAll('.payment-option');
            const screenshotSection = document.getElementById('screenshotSection');
            
            paymentOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Remove selected class from all options
                    paymentOptions.forEach(opt => opt.classList.remove('selected'));
                    
                    // Add selected class to clicked option
                    this.classList.add('selected');
                    
                    // Hide screenshot section if Cash is selected
                    const method = this.getAttribute('data-method');
                    if (method === 'cash') {
                        screenshotSection.style.display = 'none';
                    } else {
                        screenshotSection.style.display = 'block';
                    }
                });
            });
            
            // Image preview functionality
            document.getElementById('nationalId').addEventListener('change', function(e) {
                const file = e.target.files[0];
                const preview = document.getElementById('idPreview');
                
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        preview.innerHTML = `<img src="${event.target.result}" alt="ID Preview">`;
                    }
                    reader.readAsDataURL(file);
                } else {
                    preview.innerHTML = `<i class="fas fa-id-card"></i><p>ID Preview</p>`;
                }
            });
            
            document.getElementById('screenshot').addEventListener('change', function(e) {
                const file = e.target.files[0];
                const preview = document.getElementById('screenshotPreview');
                
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        preview.innerHTML = `<img src="${event.target.result}" alt="Screenshot Preview">`;
                    }
                    reader.readAsDataURL(file);
                } else {
                    preview.innerHTML = `<i class="fas fa-image"></i><p>Screenshot Preview</p>`;
                }
            });
            
            // Initialize with Cash selected
            document.querySelector('.payment-option[data-method="cash"]').classList.add('selected');
            screenshotSection.style.display = 'none';
        });
        
