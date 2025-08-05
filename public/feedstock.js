let ordersData = [];
    let editFeedModal;

    window.onload = () => {
      editFeedModal = new bootstrap.Modal(document.getElementById('editFeedModal'));
      loadFeedStock();
      loadFeedOrders();
    };

    // Load inventory from API
    function loadFeedStock() {
      fetch('/api/feed-stock')
        .then(res => res.json())
        .then(data => {
          const table = document.getElementById('feedStockTable');
          table.innerHTML = '';
          data.forEach(feed => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${feed.feedType}</td>
              <td>${feed.quantity}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary" onclick="showEditStockModal('${feed._id}', '${feed.feedType}', ${feed.quantity})">
                  Edit
                </button>
              </td>
            `;
            table.appendChild(row);
          });
        })
        .catch(err => console.error('Failed to load feed stock', err));
    }

    // Load feed orders from API
    function loadFeedOrders() {
      fetch('/api/feed-requests')
        .then(res => res.json())
        .then(data => {
          ordersData = data;
          renderOrdersTable(data);
        })
        .catch(err => console.error('Failed to load orders', err));
    }

    // Render the orders table with filter option
    function renderOrdersTable(data) {
      const table = document.getElementById('feedOrdersTable');
      table.innerHTML = '';
      data.forEach(order => {
        const statusClass =
          order.status === 'Approved' ? 'bg-success' :
            order.status === 'Cancelled' ? 'bg-danger' :
              'bg-warning text-dark';

        row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.farmerName}</td>
          <td>${order.farmerPhone}</td>
          <td>${order.feedType}</td>
          <td>${order.quantity}</td>
          <td>${order.unitCost?.toLocaleString() ?? '-'}</td>
          <td>${order.totalCost?.toLocaleString() ?? '-'}</td>
          <td>${order.paymentMethod}</td>
          <td><span class="badge ${statusClass}">${order.status}</span></td>
          <td>${new Date(order.requestDate).toLocaleDateString()}</td>
          <td>
            ${
              order.status === 'Pending' ? `
                <button class="btn btn-sm btn-success me-1" onclick="updateOrderStatus('${order._id}', 'Approved')">Approve</button>
                <button class="btn btn-sm btn-danger" onclick="updateOrderStatus('${order._id}', 'Cancelled')">Cancel</button>
              ` : '<span class="text-muted">No action</span>'
            }
          </td>
        `;
        table.appendChild(row);
      });
    }

    // Filter orders by status
    function applyFilter() {
      const selected = document.getElementById('statusFilter').value;
      if (selected === "All") {
        renderOrdersTable(ordersData);
      } else {
        const filtered = ordersData.filter(order => order.status === selected);
        renderOrdersTable(filtered);
      }
    }

    // Show modal to edit feed stock quantity
    function showEditStockModal(id, feedType, quantity) {
      document.getElementById('editFeedId').value = id;
      document.getElementById('editFeedType').value = feedType;
      document.getElementById('editFeedQuantity').value = quantity;
      editFeedModal.show();
    }

    // Submit the updated feed stock quantity to backend
    function submitStockUpdate(event) {
      event.preventDefault();
      const id = document.getElementById('editFeedId').value;
      const newQuantity = parseInt(document.getElementById('editFeedQuantity').value);

      fetch(`/api/feed-stock/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      })
        .then(res => {
          if (!res.ok) return res.json().then(data => { throw new Error(data.error || 'Failed to update feed stock'); });
          return res.json();
        })
        .then(() => {
          editFeedModal.hide();
          loadFeedStock();
          alert('✅ Feed quantity updated');
        })
        .catch(err => alert('❌ ' + err.message));
    }

    // Update order status: Approve or Cancel
    function updateOrderStatus(orderId, newStatus) {
      if (!confirm(`Are you sure you want to mark this order as ${newStatus}?`)) return;

      fetch(`/api/feed-requests/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
        .then(res => {
          if (!res.ok) return res.json().then(data => { throw new Error(data.error || 'Failed to update order status'); });
          return res.json();
        })
        .then(() => {
          loadFeedOrders();
          loadFeedStock();
          alert(`✅ Order marked as ${newStatus}`);
        })
        .catch(err => alert('❌ ' + err.message));
    };
// Opens the modal and populates it with the feed info
function openEditModal(feedType, currentQty) {
  document.getElementById('editFeedType').value = feedType;
  document.getElementById('editFeedQuantity').value = currentQty;
  document.getElementById('editFeedId').value = feedType; // we'll use feedType as ID

  const modal = new bootstrap.Modal(document.getElementById('editFeedModal'));
  modal.show();
}

